import { showModal } from './modal'

export function showWinnerModal(fighter) {
  showModal({ title:'The winner is', bodyElement:root, function:null });
}
