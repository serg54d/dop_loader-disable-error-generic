import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store'
import { setErrorAC } from '../app-reducer'

export const GlobalError = () => {
  const errorMessage = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
	  toast.onChange(({status}) => {
		if (status === 'added' ) {
			dispatch(setErrorAC(null))
		}
	  })
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
