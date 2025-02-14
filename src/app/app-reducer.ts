export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
	case 'SET-STATUS': 
		return {...state, status: action.payload.status} 
	case 'SET-ERROR': 
		return {...state, error: action.payload.error}
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => {
	return {
		type: 'SET-STATUS',
		payload: {status}
	} as const
}

export const setErrorAC = (error: any) => {
	return {
		type: 'SET-ERROR',
		payload: {error}
	} as const
}


type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorAC>
