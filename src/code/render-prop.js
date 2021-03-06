export const query = `const GET_DOG_PHOTO = gql\`
query dog($breed: String!) {
  dog(breed: $breed) {
    id
    displayImage
  }
}
\`;`;

export const queryComponent = `const DogPhoto = ({ breed }) => (
  <Query query={GET_DOG_PHOTO} variables={{ breed }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return 'Error!';

      return (
        <img src={data.dog.displayImage} />
      );
    }}
  </Query>
);`;

export const dynamic = `<Query
  query={this.state.sort !== 'LIKES' ? GET_MOVIES : GET_LIKES}
>
  {({ loading, data }) => {
    if (loading) return 'Loading...';
    return (
      <div>
        {(data.movies || data.likes).map(movie => (
          <MovieTile key={movie.id} movie={movie} />
        ))}
      </div>
    )
  }}
</Query>`;

export const mutation = `const Login = () => (
  <Mutation
    mutation={LOGIN_USER}
    onCompleted={({ login }) => localStorage.setItem('token', login)}
  >
    {(loginUser, { data, error }) => (
      <div style={styles.container}>
        <LoginForm login={loginUser} data={data} />
      </div>
    )}
  </Mutation>
);`;

export const combined = `const TodoApp = () => (
  <Query query={GET_TODOS}>
    {({ loading, data }) => {
      if (loading) return 'Loading...';
      return (
        <Mutation mutation={REMOVE_TODO}>
          {removeTodo =>
            data.todos.map(todo => (
              <Todo key={todo.id} todo={todo} removeTodo={removeTodo} />
          ))}
        </Mutation>
      );
    }}
  </Query>
);`;

export const adopt = `const TodoContainer = adopt({
  todos: <Query query={GET_TODOS} />,
  removeTodo: ({ render }) => (
    <Mutation mutation={REMOVE_TODO}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})
const App = () => (
  <TodoContainer>
    {({ todos, removeTodo }) => /* ... */ }
  </TodoContainer>
)`;

export const testUtils = `const mocks = [{
  request: { query: SINGLE_ORDER_QUERY, variables: { id: '123' } },
  result: { data: { order: fakeOrder() }},
}];

describe('<Order/>', () => {
  it('Renders loading state', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="123" />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
  })
})`;
