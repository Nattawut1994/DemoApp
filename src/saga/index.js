import { takeEvery, all } from 'redux-saga/effects'
import { ACTION_ADD_MEMBER_REQUEST, ACTION_EDIT_MEMBER_REQUEST, ACTION_REMOVE_MEMBER_REQUEST } from './actionType'
import { actionAddMembers, actionEditMembers, actionRemoveMembers } from './member.action'

function* watchAddMembersAction() {
  yield takeEvery(ACTION_ADD_MEMBER_REQUEST, actionAddMembers)
}
function* watchRemoveMembersAction() {
  yield takeEvery(ACTION_REMOVE_MEMBER_REQUEST, actionRemoveMembers)
}
function* watchEditMembersAction() {
  yield takeEvery(ACTION_EDIT_MEMBER_REQUEST, actionEditMembers)
}

export default function* rootSaga() {
  yield all([
    watchAddMembersAction(),
    watchRemoveMembersAction(),
    watchEditMembersAction()
  ])
}