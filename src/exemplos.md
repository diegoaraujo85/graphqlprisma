[GraphQL Playground](http://localhost:4000)

# Query
```
query {
  link(id:"link-3"){
    url
  }
}
```

```
query {
  feed(filter:"site") {
    id
  	description
    url
    postedBy {
      id
      name
    }
  }
}
```

```
query {
  feed(
    take: 5
    skip: 5
  ) {
    id
    description
    url
  }
}
```

```
query {
  feed(orderBy: { createdAt: asc }) {
    count
    links{
      votes{
        id
      }
    }
  }
}
```

```
query{
  feed{
    links{      
      url
      numberOfVotes
      votes{
        user{
          name
        }
      }
    }
  }
}
```


# Mutation

```
mutation{
 signup(
    name: "Icaro"
    email: "icaro@mail.com"
    password: "1234"
  ) {
    token
    user {
      id
    }
  }
}

```


```
mutation{
  login(
    email: "icaro@mail.com"
    password: "1234"
  ) {
    token
    user {
      email
      links {
        url
        description
      }
    }
  }
}

```

<p>
Após fazer login, abrir uma nova aba no Playground, clicar em HTTP Headers e adicionar o token no lugar de __TOKEN__
</p>

```
{
  "Authorization": "Bearer __TOKEN__"
}
```

# Subscription

```
subscription {
  newLink {
      id
      url
      description
      postedBy {
        id
        name
        email
      }
  }
}
```

```
subscription {
  newVote {
    id
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}
```