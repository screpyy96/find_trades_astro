/**
 * Central registry — imports all trade content files and builds
 * the lookup map used by [city].astro pages.
 *
 * To add a new trade: create a new file (e.g. my-trade.ts) and import it here.
 * To add a new city to an existing trade: edit that trade's file and add a new key.
 */
export type { TradeCityContent } from './_types';
import type { TradeCityContent } from './_types';

import alarmInstaller from './alarm-installer';
import applianceRepair from './appliance-repair';
import architect from './architect';
import bathroomFitter from './bathroom-fitter';
import blacksmith from './blacksmith';
import boilerRepair from './boiler-repair';
import bricklayer from './bricklayer';
import builder from './builder';
import carpenter from './carpenter';
import carpetFitter from './carpet-fitter';
import cctvSecurity from './cctv-security';
import chimneySweep from './chimney-sweep';
import cleaner from './cleaner';
import curtainBlindFitter from './curtain-blind-fitter';
import dampProofing from './damp-proofing';
import demolition from './demolition';
import doorFitter from './door-fitter';
import drainageSpecialist from './drainage-specialist';
import drivewaySpecialist from './driveway-specialist';
import electrician from './electrician';
import evChargerInstaller from './ev-charger-installer';
import fencer from './fencer';
import flooringSpecialist from './flooring-specialist';
import gardener from './gardener';
import gasEngineer from './gas-engineer';
import glazier from './glazier';
import gutteringSpecialist from './guttering-specialist';
import handyman from './handyman';
import heatingEngineer from './heating-engineer';
import insulationSpecialist from './insulation-specialist';
import interiorDesigner from './interior-designer';
import itNetworkInstaller from './it-network-installer';
import joiner from './joiner';
import kitchenFitter from './kitchen-fitter';
import landscaper from './landscaper';
import locksmith from './locksmith';
import painterDecorator from './painter-decorator';
import pavingSpecialist from './paving-specialist';
import pestControl from './pest-control';
import plasterer from './plasterer';
import plumber from './plumber';
import removalService from './removal-service';
import roofer from './roofer';
import scaffolder from './scaffolder';
import solarPanelInstaller from './solar-panel-installer';
import surveyor from './surveyor';
import tiler from './tiler';
import tvAerialInstaller from './tv-aerial-installer';
import welder from './welder';
import windowFitter from './window-fitter';

/**
 * Map of tradeSlug → Record<citySlug, TradeCityContent>
 */
const allTradeContent: Record<string, Record<string, TradeCityContent>> = {
  'alarm-installer': alarmInstaller,
  'appliance-repair': applianceRepair,
  'architect': architect,
  'bathroom-fitter': bathroomFitter,
  'blacksmith': blacksmith,
  'boiler-repair': boilerRepair,
  'bricklayer': bricklayer,
  'builder': builder,
  'carpenter': carpenter,
  'carpet-fitter': carpetFitter,
  'cctv-security': cctvSecurity,
  'chimney-sweep': chimneySweep,
  'cleaner': cleaner,
  'curtain-blind-fitter': curtainBlindFitter,
  'damp-proofing': dampProofing,
  'demolition': demolition,
  'door-fitter': doorFitter,
  'drainage-specialist': drainageSpecialist,
  'driveway-specialist': drivewaySpecialist,
  'electrician': electrician,
  'ev-charger-installer': evChargerInstaller,
  'fencer': fencer,
  'flooring-specialist': flooringSpecialist,
  'gardener': gardener,
  'gas-engineer': gasEngineer,
  'glazier': glazier,
  'guttering-specialist': gutteringSpecialist,
  'handyman': handyman,
  'heating-engineer': heatingEngineer,
  'insulation-specialist': insulationSpecialist,
  'interior-designer': interiorDesigner,
  'it-network-installer': itNetworkInstaller,
  'joiner': joiner,
  'kitchen-fitter': kitchenFitter,
  'landscaper': landscaper,
  'locksmith': locksmith,
  'painter-decorator': painterDecorator,
  'paving-specialist': pavingSpecialist,
  'pest-control': pestControl,
  'plasterer': plasterer,
  'plumber': plumber,
  'removal-service': removalService,
  'roofer': roofer,
  'scaffolder': scaffolder,
  'solar-panel-installer': solarPanelInstaller,
  'surveyor': surveyor,
  'tiler': tiler,
  'tv-aerial-installer': tvAerialInstaller,
  'welder': welder,
  'window-fitter': windowFitter,
};

/**
 * Get custom content for a trade + city combination.
 * Returns undefined if no custom content exists (page falls back to generic template).
 */
export function getTradeCityContent(tradeSlug: string, citySlug: string): TradeCityContent | undefined {
  return allTradeContent[tradeSlug]?.[citySlug];
}

/**
 * Check if custom content exists for a trade + city combination.
 */
export function hasCustomContent(tradeSlug: string, citySlug: string): boolean {
  return !!allTradeContent[tradeSlug]?.[citySlug];
}

/**
 * Get all trade+city combinations that have custom content.
 * Useful for sitemap priority and internal linking.
 */
export function getCustomContentKeys(): { tradeSlug: string; citySlug: string }[] {
  const keys: { tradeSlug: string; citySlug: string }[] = [];
  for (const [tradeSlug, cities] of Object.entries(allTradeContent)) {
    for (const citySlug of Object.keys(cities)) {
      keys.push({ tradeSlug, citySlug });
    }
  }
  return keys;
}
