import { useEntries } from '../hooks/useEntries';

const Home = () => {
  const entries = useEntries();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry?._id}>{entry?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
