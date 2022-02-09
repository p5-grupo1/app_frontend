import { createApp } from 'vue'
import App           from './App.vue'
import router        from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ApolloClient, createHttpLink, InMemoryCache }  from '@apollo/client/core'
import {createApolloProvider}                           from '@vue/apollo-option'
import {setContext}                                     from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'https://soluciones-verdes-apigateway.herokuapp.com/'
});

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
        ...headers,
        "Authorization": localStorage.getItem("tokenAccess") || ""
     }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache() 
});

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
});


createApp(App).use(router).use(apolloProvider).use(VueSweetalert2).mount('#app')
