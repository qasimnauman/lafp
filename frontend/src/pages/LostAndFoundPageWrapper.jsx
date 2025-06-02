// src/pages/LostAndFoundPageWrapper.jsx
import { useParams } from 'react-router-dom';
import LostAndFoundPage from './LostAndFound';

const LostAndFoundPageWrapper = () => {
  const { type } = useParams();
  return <LostAndFoundPage key={type} />;

};

export default LostAndFoundPageWrapper;
