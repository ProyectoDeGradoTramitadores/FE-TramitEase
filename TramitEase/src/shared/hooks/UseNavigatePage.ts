import { useNavigate } from 'react-router-dom';

export const useNavigatePage = (link: string) => {
    const navigate = useNavigate();
    return () => navigate(link);
};
