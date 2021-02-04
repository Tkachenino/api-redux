import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {
  fetchItemRequest,
  fetchItemSuccess,
  fetchItemFailure,
  canceChangeItem,
  changeItemField,
  saveChangeItemRequest,
  saveChangeItemSuccess,
  saveChangeItemFailure
} from '../action/ActionCreators';
import Loader from '../components/Loader';
import Error from '../components/Error';

const getFetchItem = async(dispatch, id) => {
  dispatch(fetchItemRequest());
  try {
    const resp = await fetch(`http://localhost:7070/api/services/${id}`)
    const item = await resp.json();
    dispatch(fetchItemSuccess(item))
  } catch (e) {
    dispatch(fetchItemFailure())
  }
}

const saveChangeItem = async(dispatch, data) => {
  dispatch(saveChangeItemRequest(data));
  try {
    await fetch(`http://localhost:7070/api/services`, {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
    dispatch(saveChangeItemSuccess())
  } catch (e) {
    dispatch(saveChangeItemFailure())
  }
}

const Item = ({history, match}) => {
  const dispatch = useDispatch();
  const {loading, error, item} = useSelector(store => store.item);

  useEffect(() => {
    getFetchItem(dispatch, match.params.id);
  }, [dispatch, match.params.id])

  const onInputHandler = (e) => {
    const {name, value} = e.target;
    dispatch(changeItemField(name, value))
  }

  const cancelEdit = () => {
    history.push('/services');
    dispatch(canceChangeItem())
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    saveChangeItem(dispatch, item);
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <form className='Form' onSubmit={onSubmitHandler}>
      <div className='InputWrap'>
        <label htmlFor='name'>Название</label>
        <input id='name' name='name' value={item.name} onChange={onInputHandler} />
      </div>
      <div className='InputWrap'>
        <label htmlFor='price'>Название</label>
        <input id='price' name='price' value={item.price} onChange={onInputHandler} />
      </div>
      <div className='InputWrap'>
        <label htmlFor='content'>Название</label>
        <input id='content' name='content' value={item.content} onChange={onInputHandler} />
      </div>
      <div className='FormBtnWrap'>
        <button type='button' className='Btn' onClick={cancelEdit}>Отмена</button>
        <button type='submit' className='Btn'>Сохранить</button>
      </div>
    </form>
  )
}

export default Item;