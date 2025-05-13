import { MeshMatcapMaterialProps, useLoader } from "@react-three/fiber";
import { forwardRef } from "react";
import * as THREE from "three";

export const SilverMaterial = forwardRef<
  THREE.MeshMatcapMaterial,
  MeshMatcapMaterialProps
>((props, ref) => {
  const texture = useLoader(THREE.TextureLoader, "/3d/silver-matcap.jpg");
  return (
    <meshMatcapMaterial
      {...props}
      ref={ref}
      matcap={texture}
    ></meshMatcapMaterial>
  );
});

SilverMaterial.displayName = "SilverMaterial";
