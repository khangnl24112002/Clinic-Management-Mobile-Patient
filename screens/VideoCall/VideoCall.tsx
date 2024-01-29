
import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import 'expo-dev-client';
import AgoraUIKit, { AgoraUIKitProps } from 'agora-rn-uikit';

export type ChatDetailStackParamList = {
    ChattingGroupList: undefined;
    ChattingDetail: { groupId: number; groupName: string };
    CreateChattingGroup: undefined;
    ChattingDetailSettings: { groupId: number };
    VideoCall: { groupId: number };
  };

export type ChattingGroupListScreenProps = NativeStackScreenProps<
  ChatDetailStackParamList,
  "ChattingGroupList"
>;

type VideoCallProps = NativeStackScreenProps<ChatDetailStackParamList, 'VideoCall'>;

const VideoCall: React.FC<VideoCallProps> = ({ route, navigation }) =>  {
    const { groupId } = route.params;
    
    const props: AgoraUIKitProps = {
      connectionData: {
        appId: 'a188e47a27f846e68dfd23fa9e550ea8',
        channel: groupId.toString(),
      },
      rtcCallbacks: {
        EndCall: () => navigation.navigate('ChattingGroupList'),
      },
    };
  
    return (
      <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} />
    ) 
    
}

export default VideoCall