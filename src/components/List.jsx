import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchLsitItemRequest,
  fetchLsitItemSuccess,
  fetchLsitItemFailure,
  deleteListItemRequest,
  deleteListItemSuccess,
  deleteListItemFailure
} from '../action/ActionCreators';

import Error from './Error';
import Loader from './Loader';
import pencil from '../assets/pencil.svg';
import cross from '../assets/cross.svg';

const getFetchItem = async(dispatch) => {
  try {
    dispatch(fetchLsitItemRequest());
    const resp = await fetch('http://localhost:7070/api/services/');
    const items = await resp.json();
    dispatch(fetchLsitItemSuccess(items))
  } catch (e) {
    dispatch(fetchLsitItemFailure())
  }
};

const getDeleteItem = async(dispatch, id) => {
  
    dispatch(deleteListItemRequest());
    try {
    await fetch(`http://localhost:7070/api/services/${id}`, {
      method: "DELETE"
    });
    dispatch(deleteListItemSuccess(id))
  } catch (e) {
    dispatch(deleteListItemFailure())
  }
};

const List = ({history}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    getFetchItem(dispatch);
  }, [dispatch])

  const editItem = (id) => {
    history.push(`/services/${id}`)
  }

  const deleteItem = (id) => {
    getDeleteItem(dispatch, id);
  }

  const {loading, error, items} = useSelector(store => store.list);
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }


  return (
    <div className='List'>
      {items.map(item => (
        <div className='ListItem' key={item.id}>
        <p>{item.name}: {item.price} руб.</p>
        <div className='BtnWrap'>
          <button className='Btn BtnEdit' onClick={() => {editItem(item.id)}}>
            <img src={pencil} alt='pencel' />
          </button>
          <button className='Btn BtnDelete' onClick={() => {deleteItem(item.id)}}>
            <img src={cross} alt='cross' />
            </button>
        </div>
      </div>
      ))}
    </div>
  )
}

export default List;