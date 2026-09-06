export type LegalDoc = 'terms' | 'privacy' | 'cookies' | 'eula';

export function isLegalDoc(value: string): value is LegalDoc {
  return value === 'terms' || value === 'privacy' || value === 'cookies' || value === 'eula';
}

export const LEGAL: Record<LegalDoc, { title: string; intro: string; points: string[] }> = {
  terms: {
    title: 'Terms of Service',
    intro:
      'The rules of the station. By requesting clearance you agree to extract under these terms.',
    points: [
      'Free-to-play license — the client is free and skill decides who extracts. No storefront exists inside the station.',
      'Fair passage — cheats, exploits, uplink taps, and griefing unattended drop-pods are prohibited.',
      'Station property — operatives, sectors, fiction, and all salvage remain the property of Atlas Corporation.',
      'Service changes — sectors rotate and lobbies may close for reactor maintenance without notice.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Atlas collects the minimum needed to keep the station running — and this concept site collects effectively nothing.',
    points: [
      'No accounts, no tracking profiles. The dispatch form validates locally and this demo never transmits your address.',
      'Should a live service launch, lobby telemetry such as match results and crash reports would be disclosed here first.',
      'Minimal salvage — any data held is kept only while the reactors stay hot, then purged.',
      'Review or deletion requests go through the quartermaster on community channels.',
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'Crumbs, not cookies. This site sets none of its own.',
    points: [
      'Strictly necessary — the build host may set functional cookies purely to serve these pages.',
      'Third parties — fonts and media load externally and apply their own policies.',
      'Clearance — clear your browser storage anytime; nothing on this station depends on it.',
    ],
  },
  eula: {
    title: 'End-User License Agreement',
    intro: 'License for the SALVAGE game client, summarized in plain station-speak.',
    points: [
      'Grant — install and play on your own rigs for personal, non-commercial extraction.',
      'Restrictions — no reverse-engineering drop-pod firmware, no selling clearance slots, no botting refinery runs.',
      'As-is airlock — the client ships hot; no warranties beyond getting you to the floor.',
      'Termination — breach these terms and your shuttle stops answering.',
    ],
  },
};
