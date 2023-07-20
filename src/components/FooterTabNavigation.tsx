import { Box, HStack, useTheme } from "native-base";
import { TouchableOpacity } from "react-native";
import { House, Tag, SignOut } from 'phosphor-react-native';
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type OptionsTabNavigation = 'home' | 'myAds'

type FooterTabNavigationProps = {
  selected: OptionsTabNavigation;
}

export function FooterTabNavigation({ selected }: FooterTabNavigationProps) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();

  function handleOptionSelected(option: OptionsTabNavigation) {
    if(option === 'home') {
      navigate("home");
    } else {
      navigate("myAds");
    }
  }

  return (
    <HStack w='full' p={2} pb={7} justifyContent='space-evenly' bg='gray.700'>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleOptionSelected('home')}
      >
        <Box p={3}>
          <House weight="bold" color={selected === 'home' ? colors.gray[200] : colors.gray[400]} />
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleOptionSelected('myAds')}
      >
        <Box p={3}>
          <Tag weight="bold" color={selected === 'myAds' ? colors.gray[200] : colors.gray[400]} />
        </Box>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Box p={3}>
          <SignOut weight="bold" color={colors.red[900]} />
        </Box>
      </TouchableOpacity>
    </HStack>
  )
}
