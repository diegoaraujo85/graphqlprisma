import { compare, hash } from 'bcrypt';
import { PubSub } from 'graphql-yoga';
import { sign } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

import { APP_SECRET } from '../config/auth';
import getUserId from '../utils';

interface Context {
  prisma: PrismaClient;
}


async function signup(parent, args, context: Context, info) {
  const password = await hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args, password
    }
  })

  const token = sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context: Context, info) {
  const user = await context.prisma.user.findOne({
    where: {
      email: args.email
    }
  })

  if (!user) {
    throw new Error('Invalid user/password combination')
  }

  const valid = await compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid user/password combination')
  }

  const token = sign({ userId: user.id }, APP_SECRET)

  // const token = sign({}, APP_SECRET, {
  //   subject: `${user.id}`,
  //   expiresIn: '1d',
  // });

  return {
    token,
    user,
  }
}

interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
}


interface postLinkProps {
  description: string;
  url: string;
}

interface updateLinkProps {
  id: number;
  description: string;
  url: string;
}

interface deleteLinkProps {
  id: number;
  description: string;
  url: string;
}

function postLink(parent, args: postLinkProps, context: Context, info) {

  const userId = getUserId(context);

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: Number(userId) } },
    }
  })

  context.pubsub.publish("NEWLINK", newLink);

  return newLink;
}

function updateLink(parent, args: updateLinkProps, context: Context) {

  const link = context.prisma.link.update({
    where: {
      id: Number(args.id),
    },
    data: {
      description: args.description,
      url: args.url
    }
  })

  return link;

}

function deleteLink(parent, args: deleteLinkProps, context: Context) {
  const link = context.prisma.link.delete({
    where: {
      id: Number(args.id),
    }
  })
  return link;
}

async function vote(parent, args, context: Context, info) {
  const userId = getUserId(context);

  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId
      }
    }
  })

  if (!!vote) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    }
  })

  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

export default { signup, login, postLink, vote }