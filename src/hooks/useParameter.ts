import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setParameter } from '../reducers/parameterSlice';

interface Params {
    [key: string]: string | undefined;
    param?: string;
}

const useParameter = (): string | undefined => {
    const { param } = useParams<Params>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (param) {
            dispatch(setParameter(param));
        }
    }, [param, dispatch]);

    return param;
};

export default useParameter;