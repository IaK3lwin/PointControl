import { centFactory } from '$lib/domain/cents';
import {
	ServiceEnflatable,
	serviceFoodFactory,
	serviceEnflatableFactory,
	ServiceFood} from '$lib/domain/services';

import { TypeService } from '$lib/domain/typeServices';
const crepe = new ServiceFood("crepe")
crepe.setPrice("6,00")
const pipoca = new ServiceFood("pipoca")
pipoca.setPrice("5,00")

const pulapula = new ServiceEnflatable("pula-pula")
const escorregador = new ServiceEnflatable("escorregador")

export const serviceList: Map<TypeService, (ServiceFood | ServiceEnflatable)[]> = new Map([
	[TypeService.FOOD, [
		crepe,
		pipoca
	]],
	[TypeService.ENFLATABLE, [
		pulapula,
		escorregador
	]]
]);


console.log("[LOGGER] constantes done to use: ", serviceList)