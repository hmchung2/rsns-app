import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject, ReactiveVar,
  split
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createUploadLink} from "apollo-upload-client";

import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition, offsetLimitPagination } from "@apollo/client/utilities";
import { FragmentDefinitionNode, OperationDefinitionNode } from "graphql";


export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string|null>(null);
export const colorModeVar = makeVar<"light" | "dark">("dark");

const TOKEN : string = "token";

export const logUserIn = async (token : string) : Promise<void> => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async ( ) : Promise<void> => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const uploadHttpLink : ApolloLink = createUploadLink({
  uri: "https://green-light-backend-04c79b6adf93.herokuapp.com/graphql",
});

const wsLink: GraphQLWsLink = new GraphQLWsLink(
  createClient({
    url: "ws://green-light-backend-04c79b6adf93.herokuapp.com/graphql",
    connectionParams: () => {
      return {
        token: tokenVar(),
      };
    },
  })
);

const authLink: ApolloLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink : ApolloLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const httpLinks : ApolloLink = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink : ApolloLink  = split(
  ({ query  }) => {
    const definition : OperationDefinitionNode | FragmentDefinitionNode  = getMainDefinition(query);
    const isSubscription : boolean =  definition.kind === "OperationDefinition" && definition.operation === "subscription";
    return isSubscription;
  },
  wsLink,
  httpLinks
);



// export const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         seeFeed: {
//           keyArgs: false,
//           merge(existing, incoming) {
//             if (existing) {
//               const result = { ...existing, ...incoming, photos: [...existing.photos, ...incoming.photos] };
//               return result;
//             }
//             return incoming;
//           },
//         },
//       },
//     },
//   },
// });

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
      },
    },
    User: {
      keyFields: ["id"], // Ensure User objects have an ID
    },
  },
});


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
