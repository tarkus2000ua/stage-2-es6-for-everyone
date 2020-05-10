import { showModal } from './modal'
import { createElement } from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';

export function showWinnerModal(fighter) {
  const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
  const fighterName = createElement({
    tagName: 'div',
    className: `fighter-preview___name`,
  });
  fighterName.innerHTML = fighter.name;
  bodyElement.appendChild(fighterName);
  const fighterImg = createFighterImage(fighter);
  bodyElement.appendChild(fighterImg);
  const closeHandler = () => {window.location = '../../../../index.html'};
  showModal({ title:'The winner is:', bodyElement, closeHandler});
}
