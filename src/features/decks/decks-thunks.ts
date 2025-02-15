import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC, setErrorAC } from '../../app/app-reducer.ts'
import { AxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await decksAPI.fetchDecks();
    dispatch(setDecksAC(res.data.items));
    dispatch(setAppStatusAC('succeeded'));
  } catch (err) {
    dispatch(setAppStatusAC('failed'));
  }
};

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

// case-1: ошибки бэка . Ошибку создает axios. в e.res.data - ответ сервера
// case-2: network error - axios создает объект ошибки, сообщение можно взять из поля e.message
// case-3: синхронные ошибки - создается нативная JS-ошибка, имеет поле message 

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
	try {
		// throw new Error('Boooom!')
		const res = await decksAPI.updateDeck(params)
		dispatch(updateDeckAC(res.data))
	}
	catch (err: any) {
		errorHandler(err, dispatch)
		// console.log(err)
	}
}

function errorHandler (err: any, dispatch: Dispatch) {

	if (err.code === "ERR_NETWORK" ) {
		dispatch(setErrorAC(err.message))
	} else if (err.response) {
		dispatch(setErrorAC(err.response.data.errorMessages[0].message))
		console.log(err)
	} else if (err instanceof Error){
		dispatch(setErrorAC(err.message))
	}
	
}


type ErrorType = {
  message: string; // Сообщение об ошибке
  status: number; // HTTP статус (например, 400, 500)
  code?: string; // Код ошибки (например, "ERR_BAD_REQUEST")
  response?: {
    data: {
      errorMessages: { message: string }[]; // Ожидаемая структура ошибки от бэкенда
    };
  };
};
