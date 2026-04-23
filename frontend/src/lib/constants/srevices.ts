import { centFactory } from '$lib/domain/cents';
import {
	serviceFoodFactory,
	serviceEnflatableFactory,
	type ServiceFood,
	type ServiceEnflatable
} from '$lib/domain/services';

import { TypeService } from '$lib/domain/typeServices';

export const serviceList: Map<TypeService, (ServiceFood | ServiceEnflatable)[]> = new Map([
	[TypeService.FOOD, []],
	[TypeService.ENFLATABLE, []]
]);

serviceList.get(TypeService.FOOD)!.push(
	serviceFoodFactory('crepe', centFactory("6,00"))
);

serviceList.get(TypeService.FOOD)!.push(
	serviceFoodFactory('pipoca', centFactory('5,00'))
);
serviceList.get(TypeService.FOOD)!.push(
  serviceEnflatableFactory('cachorro-quente', centFactory('8,00'))
)

serviceList.get(TypeService.ENFLATABLE)!.push(
	serviceEnflatableFactory('pula-pula', centFactory("10"))
);

serviceList.get(TypeService.ENFLATABLE)!.push(
	serviceEnflatableFactory('Escorregador', centFactory("5"))
);

serviceList.get(TypeService.ENFLATABLE)!.push(
	serviceEnflatableFactory('tigrinho', centFactory("10"))
);