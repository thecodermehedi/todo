import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/container";


const Todo = () => {
 return (
  <Container>
   <h1 className="text-center text-3xl my-10 font-semibold">Todos</h1>
   <TodoContainer />
  </Container>
 );
};

export default Todo;
