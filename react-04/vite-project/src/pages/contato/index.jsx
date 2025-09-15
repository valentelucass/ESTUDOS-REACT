import './index.css'

export default function Contato() {
  return (
    <div className="pagina-contato">
      <h1>Contato</h1>
      <p>Entre em contato conosco preenchendo o formulário abaixo</p>
      
      <form>
        <label>
          Nome:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Mensagem:
          <textarea name="message" rows="5"></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
