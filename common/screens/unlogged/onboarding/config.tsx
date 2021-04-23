import React from 'react';
import { t } from '../../../../strings';
import { IconAppDelivery } from '../../../icons/icon-app-delivery';
import { IconBeta } from '../../../icons/icon-beta';
import { IconHangLoose } from '../../../icons/icon-hang-loose';
import { IconHeartBox } from '../../../icons/icon-heart-box';
import { IconShareBig } from '../../../icons/icon-share-big';

export interface ScreenConfig {
  icon: React.ReactNode;
  header: string;
  body: string[];
  buttonTitle: string;
}
export const courier: ScreenConfig[] = [
  {
    header: t('Olá,\n que legal ver você aqui!'),
    body: [
      t(
        'Mais que um App de entregas, agora você faz parte de um movimento por relações mais justas e pelo fim da precarização do trabalho.'
      ),
      t(
        'Estamos apenas começando. Com o comprometimento de todos, vamos dar certo. Ajude divulgando esse movimento!'
      ),
    ],
    icon: <IconHangLoose />,
    buttonTitle: t('Avançar'),
  },
  {
    header: t('O AppJusto ainda está em fase de testes'),
    body: [
      t(
        'Por enquanto, estamos em fase de validação e testes da plataforma. Queremos construir o melhor serviço pra você.'
      ),
      t(
        'Fique à vontade para nos avisar pelo chat se perceber algum problema e também para contribuir com sugestões. Vamos juntos!'
      ),
    ],
    icon: <IconBeta />,
    buttonTitle: t('Iniciar cadastro'),
  },
];

export const consumer = [
  {
    header: t('Olá,\n boas vindas ao AppJusto!'),
    body: [
      t(
        'Mais que um App de delivery, somos um movimento por relações mais justas para clientes, restaurantes e entregadores.'
      ),
      t(
        'O AppJusto veio para combater a precarização do trabalho e, com a ajuda de todos, vamos fazer dar certo!'
      ),
    ],
    icon: <IconHangLoose />,
    buttonTitle: t('Avançar'),
  },
  {
    header: t('O AppJusto ainda está em fase de testes'),
    body: [
      t(
        'Por enquanto, estamos em fase de validação e testes da plataforma. Queremos construir o melhor serviço pra você.'
      ),
      t(
        'Imprevistos podem ocorrer nesse início. VoCê pode nos avisar pelo chat e também contribuir com sugestões. Vamos construir juntos!'
      ),
    ],
    icon: <IconBeta />,
    buttonTitle: t('Avançar'),
  },
  {
    header: t('Use para Delivery e Entrega de\n encomendas'),
    body: [
      t(
        'No Delivery, transferimos o valor integral das entregas para o entregador e cobramos a menor comissão possível do resraunte. Tudo para você ter o melhor serviço e menor preço.'
      ),
      t('Na entrega de encomendas, os entregadores recebem o valor da frota que você escolher.'),
    ],
    icon: <IconAppDelivery />,
    buttonTitle: t('Avançar'),
  },
  {
    header: t('Escolha a frota que quiser!'),
    body: [
      t(
        'O AppJusto permite que entregadores criem suas próprias frotas. Escolha por remuneração justa, causa social, emissão de CO2, tempo de entrega. Você pode escolher a frota que mais se identifica para a sua entrega!'
      ),
      t('Elas são ordenadas por quantidade de entregadores ativos próximos a você.'),
    ],
    icon: <IconHeartBox />,
    buttonTitle: t('Avançar'),
  },
  {
    header: t('Use o AppJusto e indique para\n os seus amigos'),
    body: [
      t('Quanto mais você usar e indicar, mais vocÊ ajuda o movimento a crescer!'),
      t(
        'Além de tornar as relações mais justas na sua região, você ainda ajuda a melhorar a qualidade do serviço para entregadores e restaurantes.'
      ),
    ],
    icon: <IconShareBig />,
    buttonTitle: t('Começar'),
  },
];