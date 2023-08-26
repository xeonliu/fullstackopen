const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

const App = (props) => {
  const { notes } = props;

  //必须为Note组件定义key属性而不是li
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note}></Note>
        ))}
      </ul>
    </div>
  );
};

export default App;
