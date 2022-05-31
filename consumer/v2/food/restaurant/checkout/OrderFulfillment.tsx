import React from 'react';
import { Animated, Dimensions, LayoutAnimation, Text, View } from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import SliderButton from '../../../../../courier/approved/ongoing/SliderButton';

export type Fulfillment = 'delivery' | 'take-away';

interface OrderFulfillmentProps {
  handleChange: (value: Fulfillment) => void;
}

const { width } = Dimensions.get('window');
const trackHeight = 48;
const thumbWidth = 180;
// const marginHorizontal = 0;
const leftmost = 0;
const rightmost = width - thumbWidth;
const threshold = 30;

export const OrderFulfillment = ({ handleChange }: OrderFulfillmentProps) => {
  // state
  const [translateX, setTranslateX] = React.useState(0);
  const [fulfillment, setFulfillment] = React.useState<Fulfillment>('delivery');
  // UI handlers
  const onGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    // if (confirmed) return;
    const { translationX } = event.nativeEvent;
    if (translationX >= leftmost && translationX <= rightmost) setTranslateX(translationX);
  };
  const onGestureEnded = () => {
    const shouldConfirm = translateX > 0 && rightmost - translateX < threshold;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (shouldConfirm) {
      setFulfillment('take-away');
      setTranslateX(rightmost);
      handleChange('take-away');
    } else {
      setFulfillment('delivery');
      handleChange('delivery');
      setTranslateX(0);
    }
  };
  // UI
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 10,
        marginBottom: 8,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          height: 60,
          padding: 6,
          backgroundColor: '#2F422C',
          borderRadius: 30,
        }}
      >
        <View style={{ position: 'relative' }}>
          <View
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 32,
            }}
          >
            <Text style={{ color: 'white' }}>Entregar</Text>
            <Text style={{ color: 'white' }}>Retirar</Text>
          </View>
          <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnded}>
            <Animated.View
              style={{
                position: 'absolute',
                left: leftmost,
                transform: [{ translateX }],
              }}
            >
              <SliderButton
                title={fulfillment === 'delivery' ? 'Entregar' : 'Retirar'}
                style={{ height: trackHeight, width: '81%', borderRadius: 30 }}
                // activityIndicator={confirmed}
                buttonColor="#B8E994"
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};
