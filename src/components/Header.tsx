import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Heading } from "native-base";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native";

type HeaderProps = {
  title?: string;
  showIconBack?: boolean;
  showIcon?: 'edit' | 'plus' | 'none';
  onPressIconEditOrPlus?: () => void;
}

export function Header({ title = '', showIconBack = false, showIcon = 'none', onPressIconEditOrPlus, }: HeaderProps) {
  const { goBack } = useNavigation();

  return (
    <HStack pt={12} px={3} alignItems='center' justifyContent='space-between'>
      {showIconBack ? (
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Box p={3}>
            <ArrowLeft weight="bold" size={24} />
          </Box>
        </TouchableOpacity>
      ) : (
        <Box p={6} />
      )}

      <Heading fontFamily='heading' fontSize='xl' color='gray.100'>
        {title}
      </Heading>

      {showIcon !== 'none' ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onPressIconEditOrPlus}>
          <Box p={3}>
            {showIcon === 'edit' ? (
              <PencilSimpleLine weight="bold" size={24} />
            ) : (
              <Plus weight="bold" size={24} />
            )}
          </Box>
        </TouchableOpacity>
      ) : (
        <Box p={6} />
      )}
    </HStack>
  )
}