import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const handleEatHereClick = () => {
    history.push('/App?essen=vorort');
  };

  const handleTakeoutClick = () => {
    history.push('/App?essen=mitnehmen');
  };

  return (
    <div>
      <h1>Willkommen</h1>
      <button onClick={handleEatHereClick}>Zum Hier Essen</button>
      <button onClick={handleTakeoutClick}>Zum Mitnehmen</button>
    </div>
  );
}

export default Home;
