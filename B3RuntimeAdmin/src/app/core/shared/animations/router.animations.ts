import { trigger, state, animate, style, transition } from '@angular/core';

export function moveIn() {
  return trigger('moveIn', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(100px)' }),
      animate('.6s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: '1', transform: 'translateX(0)' }),
      animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
    ])
  ]);
}

export function fallIn() {
  return trigger('fallIn', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(40px)' }),
      animate('.4s .2s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: '1', transform: 'translateX(0)' }),
      animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
    ])
  ]);
}

export function growShrink() {
  return trigger('growShrink',
    [transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.0)' }),
      animate('.8s .6s ease-in'), style({ opacity: 1, transform: 'scale(1.0)' })
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'scale(1.0)' }),
      animate('.4s ease-out'), style({ opacity: 0, transform: 'scale(0.0)' })
    ])]
  );
}

export function fallInAbove() {
  return trigger('fallInAbove', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-40px)' }),
      animate('.4s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ])
  ]);
}

export function grow() {
  return trigger('grow', [
    transition(':enter', [
      style({ opacity: '0', transform: 'scale(0.0)' }),
      animate('.4s .2s ease-in-out', style({ opacity: '1', transform: 'scale(1.0)' }))
    ])
  ]);
}

export function moveInLeft() {
  return trigger('moveInLeft', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-100px)' }),
      animate('.6s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ])
  ]);
}
