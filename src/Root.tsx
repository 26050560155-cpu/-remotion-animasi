import {Composition} from 'remotion';
import {MyAnimation} from './MyAnimation';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyAnimation"
      component={MyAnimation}
      durationInFrames={150} // 5 detik @ 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: 'Halo, Remotion!',
        subtitle: 'Dirender otomatis lewat GitHub Actions',
      }}
    />
  );
};
