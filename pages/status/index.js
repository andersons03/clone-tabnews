import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização {updatedAtText}</div>;
}

function DataBaseStatus() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  console.log(data);

  let dataBaseContent = "Carregando...";

  if (!isLoading && data) {
    dataBaseContent = (
      <>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões abertas: {data.dependencies.database.opened_connections}</p>
        <p>Conexões maxima: {data.dependencies.database.max_connections}</p>
      </>
    );
  }

  return (
    <div>
      <h2>Banco</h2>
      {dataBaseContent}
    </div>
  );
}
