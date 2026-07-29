const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-neutral-800 animate-pulse rounded ${className}`} />
);

export default Skeleton;
