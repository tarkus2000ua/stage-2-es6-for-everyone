import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const fighterPreviewHead = createElement({
    tagName: 'div',
    className: `fighter-preview___head`,
  });
  fighterElement.appendChild(fighterPreviewHead);

  const fighterPreviewBody = createElement({
    tagName: 'div',
    className: `fighter-preview___body`,
  });
  fighterElement.appendChild(fighterPreviewBody);

  const fighterName = createElement({
    tagName: 'div',
    className: `fighter-preview___name`,
  });
  fighterName.innerHTML = fighter.name;
  fighterPreviewHead.appendChild(fighterName);

  const fighterImg = createFighterImage(fighter);
  fighterPreviewBody.appendChild(fighterImg);

  const fighterPreviewText = createElement({
    tagName: 'div',
    className: `fighter-preview___text`,
  });
  fighterPreviewBody.appendChild(fighterPreviewText);

  const fighterAttack = createElement({
    tagName: 'div',
    className: `fighter-preview___item`,
  });
  fighterAttack.innerHTML = `attack: ${fighter.attack}`;
  fighterPreviewText.appendChild(fighterAttack);

  const fighterDefense = createElement({
    tagName: 'div',
    className: `fighter-preview___item`,
  });
  fighterDefense.innerHTML = `defense: ${fighter.defense}`;
  fighterPreviewText.appendChild(fighterDefense);

  const fighterHealth = createElement({
    tagName: 'div',
    className: `fighter-preview___item`,
  });
  fighterHealth.innerHTML = `health: ${fighter.health}`;
  fighterPreviewText.appendChild(fighterHealth);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
