import gql from 'graphql-tag';
export const get_todo = gql`
  query listTodos{
   todos{
    id  
    name
    priority
  }
}
`