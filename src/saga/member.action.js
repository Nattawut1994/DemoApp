import { useSelector } from 'react-redux'
import { put, delay } from 'redux-saga/effects'
import { ACTION_ADD_MEMBER, ACTION_EDIT_MEMBER, ACTION_REMOVE_MEMBER } from '../actionType'

export function* actionAddMembers({ payload }) {
  // yield delay(1000)
  yield put({ type: ACTION_ADD_MEMBER, payload })
}

export function* actionRemoveMembers({ payload }) {
  // yield delay(1000)
  yield put({ type: ACTION_REMOVE_MEMBER, payload })
}

export function* actionEditMembers({ payload }) {
  // yield delay(1000)
  yield put({ type: ACTION_EDIT_MEMBER, payload })
}