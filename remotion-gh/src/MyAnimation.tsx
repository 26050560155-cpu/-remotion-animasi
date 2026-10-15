import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {title: string; subtitle: string};

const Circle: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}> = ({x, y, size, color, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame: frame - delay, fps, config: {damping: 12}});
  const float = Math.sin((frame + delay * 5) / 15) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + float,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity: 0.35,
        transform: `scale(${scale})`,
      }}
    />
  );
};

const Title: React.FC<Props> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const subOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineWidth = interpolate(frame, [15, 55], [0, 500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <h1
        style={{
          fontFamily: 'sans-serif',
          fontSize: 140,
          color: 'white',
          margin: 0,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </h1>
      <div style={{height: 6, width: lineWidth, background: 'white', margin: '24px 0'}} />
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: 48,
          color: 'white',
          margin: 0,
          opacity: subOpacity,
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};

export const MyAnimation: React.FC<Props> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const hue = interpolate(frame, [0, durationInFrames], [220, 300]);
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue},70%,40%), hsl(${hue + 40},70%,25%))`,
        opacity: fadeOut,
      }}
    >
      <Circle x={150} y={150} size={300} color="#ffffff" delay={0} />
      <Circle x={1400} y={600} size={400} color="#ffd166" delay={8} />
      <Circle x={900} y={80} size={180} color="#06d6a0" delay={16} />
      <Sequence from={10}>
        <Title title={title} subtitle={subtitle} />
      </Sequence>
    </AbsoluteFill>
  );
};
