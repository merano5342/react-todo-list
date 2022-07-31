import { useState, useCallback } from 'react';
import RenderTip from '../RenderTip';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import TodoFilter from '../TodoFilter';

type TodoType = {
  id: string,
  text: string,
  done: boolean,
};

const initialList: TodoType[] = [
  { id: 'id1', text: '學會 React', done: true },
  { id: 'id2', text: '年薪百萬', done: false },
];

const TodoList = () => {
  const [list, setList] = useState(initialList);
  const [filterType, setFilterType] = useState('all');

  const atAddItem = useCallback((text: string) => {
    setList((prev) => {
      const item: TodoType = {
        id: new Date().getTime().toString(),
        text,
        done: false,
      };
      return prev.concat(item);
    });
  }, []);

  const atDeleteItem = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const atToggleItem = useCallback((id: string) => {
    setList((prev) => {
      return prev.map((item: TodoType) => {
        if (item.id === id) {
          return {
            id: item.id,
            text: item.text,
            done: !item.done,
          };
        }
        return item;
      });
    });
  }, []);

  const atFilterChange = useCallback((type: string) => {
    setFilterType(type);
  }, []);

  const filtersList = list.filter((todo: TodoType) => {
    if (filterType === 'completed') {
      return todo.done;
    }
    if (filterType === 'active') {
      return !todo.done;
    }
    return true;
  });

  return (
    <section className="todo-list" data-name="TodoList">
      <RenderTip />
      <TodoForm onAddItem={atAddItem} />
      <TodoFilter filterType={filterType} onFilterChange={atFilterChange} />
      <div>
        {filtersList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            done={item.done}
            text={item.text}
            onToggleItem={atToggleItem}
            onDeleteItem={atDeleteItem}
          />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
