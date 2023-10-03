import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await client.clearStore();
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

export const handleAllVn = async (userId, boolean) => {
  const userVnAll = `${userId}VnAll`;
  await AsyncStorage.setItem(userVnAll, JSON.stringify(boolean));
};

export const handleDistrict = async (userId, ...list) => {
  const userDistrict = `${userId}District`;
  await AsyncStorage.setItem(userDistrict, JSON.stringify(list));
};

// const uploadHttpLink = createUploadLink({
//   uri: "http://localhost:4000/graphql",
// });
// for web

// const uploadHttpLink = createUploadLink({
//   uri: "http://10.0.2.2:4000/graphql",
// });
// for simulator

// const uploadHttpLink = createUploadLink({
//   uri: "https://25fc-182-160-125-147.in.ngrok.io",
// });

const uploadHttpLink = createUploadLink({
  uri: "http://vinaarba-backend-env2.eba-2mvwe7wn.ap-southeast-1.elasticbeanstalk.com/",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeAllUserPosts: offsetLimitPagination(),
        seeUserCategoryPost: offsetLimitPagination(["categoryId"]),
        seeAllCompanyPosts: offsetLimitPagination(),
        seeFavoritePosts: offsetLimitPagination(),
        seeUserAllPosts: offsetLimitPagination(["userId"]),
        seeCompanyAllPosts: offsetLimitPagination(["companyId"]),
        seeFollowing: offsetLimitPagination(["userId"]),
        seeFollowers: offsetLimitPagination(["userId"]),
        seeCompanyPostByDistrict: offsetLimitPagination([
          "addressStep1_1",
          "addressStep1_2",
          "addressStep1_3",
          "addressStep1_4",
          "addressStep1_5",
          "addressStep2_1",
          "addressStep2_2",
          "addressStep2_3",
          "addressStep2_4",
          "addressStep2_5",
        ]),
        seeAllNotification: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
