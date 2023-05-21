
import { useState, useEffect } from 'react';
import axios from 'axios';


// Exemplo de uso 

// const {response,loading,error} = useFetch(
//     {
//       method: 'post',
//       url: '/filmes',
//       headers: JSON.stringify({ accept: '*/*' }),
//       body: JSON.stringify({
//         userId: 1,
//         id: 19392,
//         title: 'title',
//         body: 'Sample text',
//       })
//     });

axios.defaults.baseURL = 'http://localhost:8080/';

const useFetch = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useFetch;
