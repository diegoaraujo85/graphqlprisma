import { PubSub } from 'graphql-yoga';

interface Context {
  pubsub: PubSub;
}

function newLinkSubscribe(parent, args, context: Context, info) {
  return context.pubsub.asyncIterator("NEWLINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload
  },
}

function newVoteSubscribe(parent, args, context: Context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload
  }
}

export default { newLink, newVote }