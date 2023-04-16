
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

axios.defaults.baseURL = 'nossa api';

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
    }, [method, url, body, headers, fetchData]);

    return { response, error, loading };
};

export default useFetch;
