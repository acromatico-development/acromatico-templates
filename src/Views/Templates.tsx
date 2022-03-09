import { useCallback, useState, useRef } from "react";
import logo from "../logo.svg";

type Propuesta = {
  name: string | undefined;
  url: string | undefined;
  price: string | undefined;
  description: string | undefined;
};

const MyDoc = ({ propuestas }: { propuestas: Propuesta[] }) => {
  const pdfContent = useRef(null);

  return (
    <div ref={pdfContent} className="PDFContent">
      <img src={logo} className="PDF-logo" alt="logo" />
      <div className="PDF-content">
        <h1>Propuesta de Templates</h1>
        <p>
          Hola Rafael González, hemos revisado la tienda te templates de Shopify
          para encontrar algún template que se acople a tu marca y la estructura
          de sitio que diseñamos en el mapa de sitio que diseñamos. A
          continuación se muestran las opciones de template que te recomendamos:
        </p>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Link</th>
              <th>Precio</th>
              <th>Comentarios Acromático</th>
            </tr>
          </thead>
          <tbody>
            {propuestas.map((propuesta) => (
              <tr key={propuesta.url}>
                <td>{propuesta.name}</td>
                <td>
                  <a href={propuesta.url}>{propuesta.url}</a>
                </td>
                <td>{propuesta.price}</td>
                <td>{propuesta.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="PDF-footer">
        <p>actomatico.dev | hola@acromati.co | +56 2109 2388</p>
      </div>
    </div>
  );
};

const Templates = () => {
  const [shopTemplates, setShopTemplates] = useState<Propuesta[]>([]);

  const handleDelete = useCallback((indice) => {
    const newArray = [...shopTemplates].splice(indice, 1);

    setShopTemplates(newArray);
  }, [shopTemplates]);

  const handleShopifyTemplates = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const newArray: Propuesta[] = shopTemplates
        ? [...shopTemplates, { 
          name: formData.get("name")?.toString(),
          url: formData.get("url")?.toString(),
          price: formData.get("price")?.toString(),
          description: formData.get("description")?.toString()
        }]
        : [];

      setShopTemplates(newArray);
    },
    [shopTemplates]
  );

  return (
    <>
      <div className="no-print">
        <h2>Shopify Template Options</h2>
        <p>
          Plantilla para enviar opciones de template a clientes con una tienda
          en contrucción.
        </p>
        <h3>Agrega un nuevo Template</h3>
        <div className="grid-form">
          <form onSubmit={handleShopifyTemplates}>
            <input
              type="text"
              name="name"
              placeholder="Nombre Template"
              required
            />
            <input type="text" name="url" placeholder="URL" required />
            <input type="text" name="price" placeholder="Precio" required />
            <textarea
              name="description"
              placeholder="Comentarios"
              id=""
              cols={30}
              rows={10}
              required
            ></textarea>
            <button>Add Theme</button>
          </form>
          <div>
            {shopTemplates.map((plantilla, indice) => {
              return (
                <div key={plantilla.url} className="theme-preview">
                  <div>
                    <h5>{plantilla.name}</h5>
                    <p>{plantilla.price}</p>
                  </div>
                  <p className="theme-delete" onClick={() => handleDelete(indice)}>🗑</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {shopTemplates.length > 0 && <MyDoc propuestas={shopTemplates} />}
    </>
  );
};

export default Templates;
