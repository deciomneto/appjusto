import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { t } from '../../../../strings';
import { AppJustoAssistanceWhatsAppURL, AppJustoInstagramURL } from '../../../../strings/values';
import { IconInstagram } from '../../../icons/icon-instagram';
import { IconWhatsapp } from '../../../icons/icon-whatsapp';
import { track } from '../../../store/api/track';
import HomeCard from './HomeCard';

type Props = {
  app: 'instagram' | 'whatsapp';
};

export const SocialMediaCard = ({ app }: Props) => {
  const title = app === 'instagram' ? t('Seguir no Instagram') : t('Adicionar no WhatsApp');
  const subtitle =
    app === 'instagram'
      ? t('Clique para seguir o AppJusto no Instagram')
      : t('Clique para adicionar o nosso número e participar da linha de transmissão');
  return (
    <TouchableOpacity
      onPress={
        app === 'instagram'
          ? () => {
              track('Opened AppJusto instagram');
              Linking.openURL(AppJustoInstagramURL);
            }
          : () => {
              track('Opened AppJusto whatsapp');
              Linking.openURL(AppJustoAssistanceWhatsAppURL);
            }
      }
    >
      <HomeCard
        icon={app === 'instagram' ? <IconInstagram /> : <IconWhatsapp />}
        title={title}
        subtitle={subtitle}
      />
    </TouchableOpacity>
  );
};
