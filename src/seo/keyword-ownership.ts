import type { KeywordOwnershipEntry } from './types';

/**
 * Keyword ownership SoT (speglar docs/keyword-ownership.md).
 * Används av seo-smoke och framtida Fas B (GSC/kannibalisering).
 */
export const KEYWORD_OWNERSHIP: KeywordOwnershipEntry[] = [
  {
    intent: 'hyra högtalare/PA + ort',
    owner: 'festutrustning',
    skaneeventPath: null,
    festPath: '/hyra-hogtalare-malmo',
    riskLevel: 'low',
  },
  {
    intent: 'hyra ljud/ljus Malmö/Skåne',
    owner: 'festutrustning',
    skaneeventPath: null,
    festPath: '/ljud-ljus-malmo',
    riskLevel: 'low',
  },
  {
    intent: 'produkter, paket, priser',
    owner: 'festutrustning',
    skaneeventPath: null,
    festPath: '/produkter',
    riskLevel: 'low',
  },
  {
    intent: 'företagsevent Skåne/Malmö/Lund/HBG',
    owner: 'skaneevent',
    skaneeventPath: '/foretagsevent/',
    festPath: '/foretag',
    riskLevel: 'high',
  },
  {
    intent: 'eventteknik Skåne/Malmö',
    owner: 'skaneevent',
    skaneeventPath: '/eventteknik/',
    festPath: '/eventteknik-foretag',
    riskLevel: 'high',
  },
  {
    intent: 'eventproduktion Skåne',
    owner: 'skaneevent',
    skaneeventPath: '/eventproduktion/',
    festPath: '/foretag',
    riskLevel: 'medium',
  },
  {
    intent: 'teknik till konferens/gala/lansering',
    owner: 'skaneevent',
    skaneeventPath: '/konferens/',
    festPath: null,
    riskLevel: 'medium',
  },
  {
    intent: 'företagsfest / julfest / kickoff (planering)',
    owner: 'skaneevent',
    skaneeventPath: '/julfest/',
    festPath: '/foretag',
    riskLevel: 'high',
  },
  {
    intent: 'ljud/ljus till företagsevent',
    owner: 'skaneevent',
    skaneeventPath: '/ljud-ljus-foretagsevent/',
    festPath: '/ljud-ljus-skane',
    riskLevel: 'medium',
  },
  {
    intent: 'scen till företagsevent',
    owner: 'skaneevent',
    skaneeventPath: '/scen-till-event/',
    festPath: '/scen',
    riskLevel: 'medium',
  },
  {
    intent: 'mikrofoner till paneldiskussion',
    owner: 'skaneevent',
    skaneeventPath: '/guider/mikrofoner-paneldiskussion/',
    festPath: null,
    riskLevel: 'low',
  },
];

/** HIGH-risk pairs that must stay mapped for smoke checks. */
export const HIGH_OWNERSHIP_SKANEEVENT_PATHS = [
  '/foretagsevent/',
  '/eventteknik/',
  '/julfest/',
] as const;

export function getHighRiskOwnershipEntries(): KeywordOwnershipEntry[] {
  return KEYWORD_OWNERSHIP.filter((e) => e.riskLevel === 'high');
}
