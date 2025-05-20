import { Environment, Float, OrbitControls } from "@react-three/drei"
import { Heart } from "./Heart"

export const Experience = () => {
    return (
        <>
            <OrbitControls enableZoom={false}/>
            <Float floatIntensity={2} speed={3}>
                <Heart scale={0.25}/>
                {/* <Heart scale={0.5}/> */}
            </Float>
            <Environment preset="sunset" background blur={0.4}/>
        </>
    )
}