import Layout from "@/src/layout/Layout"

export default function Home() {
  return (
    <Layout>
      <h1>Inertia</h1>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ padding: "20px" }}>
          <h2>Section {i + 1}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ))}
    </Layout>
  )
}
