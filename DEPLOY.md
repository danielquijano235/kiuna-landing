# Publicar kiuna.cloud (Hostinger VPS + EasyPanel)

Guia paso a paso para poner la landing de Kiuna AI en `https://kiuna.cloud`.
El sitio se construye con Docker (archivo `Dockerfile` + `nginx.conf` de este repo):
EasyPanel descarga el codigo de GitHub, construye la imagen y la sirve con nginx.

> **Importante:** la clave de Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY`) esta en tu archivo
> `.env.local` y **nunca** se sube a GitHub (`.gitignore` la excluye). Solo se pega en EasyPanel.

---

## 0. Antes de empezar

Necesitas:

- El repositorio `kiuna-landing` en GitHub (privado), con la rama `main`.
  Si aun no existe, desde la carpeta del proyecto:
  ```bash
  gh auth login            # solo la primera vez
  gh repo create kiuna-landing --private --source . --remote origin
  git push -u origin main
  ```
- Acceso a EasyPanel en tu VPS (normalmente `http://IP-DEL-VPS:3000`).
- La **IP publica del VPS** (hPanel → VPS → tu servidor → "Direccion IP"). La usaras en el paso 3.
- El valor de `VITE_WEB3FORMS_ACCESS_KEY` (abre `.env.local` con el Bloc de notas y copia lo que va despues del `=`).

---

## 1. Crear la app en EasyPanel

1. Entra a EasyPanel → **Create Project** → nombre: `kiuna` → Create.
2. Dentro del proyecto: **+ Service** → **App** → nombre: `landing` → Create.
3. Pestaña **Source** → elige **GitHub**.
   - Si es la primera vez, conecta tu cuenta de GitHub (EasyPanel te pide un token o instalar su GitHub App; dale acceso al repo `kiuna-landing`).
   - Owner: tu usuario · Repository: `kiuna-landing` · Branch: `main` · Build path: `/`.
   - Guarda (**Save**).
4. Pestaña **Build** → selecciona **Dockerfile** (ruta: `Dockerfile`) → Save.
5. Pestaña **Environment**:
   - Agrega la variable `VITE_WEB3FORMS_ACCESS_KEY=<tu clave>`.
   - Activa la opcion **"Create .env file" / "Available at build time"** si aparece. Si EasyPanel tiene un campo separado de **Build Arguments**, pon ahi tambien `VITE_WEB3FORMS_ACCESS_KEY=<tu clave>`.
   - Motivo: Vite mete la clave dentro del JavaScript **al construir**; si solo esta en tiempo de ejecucion, el formulario no funcionara.
   - Save.
6. Pestaña **Domains / Proxy**: el puerto interno de la app es **80** (nginx).
7. Pulsa **Deploy** y mira los logs. Al final debe aparecer algo como `nginx ... start worker processes`.
8. **Auto-deploy:** en Source/Deployments activa **Auto Deploy** (webhook de GitHub). Asi cada `git push` a `main` vuelve a publicar el sitio solo.

---

## 2. Dominios y HTTPS en EasyPanel

En el servicio `landing` → **Domains**:

1. **Add Domain** → Host: `kiuna.cloud` · HTTPS: **activado** · Puerto: `80` · Path: `/` → Save.
2. **Add Domain** → Host: `www.kiuna.cloud` · HTTPS: activado · Puerto: `80`.
3. Redireccion www → sin www: en el dominio `www.kiuna.cloud` usa la opcion **Redirect** hacia `https://kiuna.cloud` (si tu version de EasyPanel no la tiene, deja ambos dominios sirviendo la app; funciona igual).
4. El certificado HTTPS (Let's Encrypt) se genera **automaticamente**, pero **solo despues** de que el DNS (paso 3) apunte al VPS. Si al principio ves un error de certificado, espera a que propague el DNS y vuelve a desplegar o espera unos minutos.

---

## 3. DNS en Hostinger

hPanel → **Dominios** → `kiuna.cloud` → **DNS / Nameservers**.

1. Comprueba que los nameservers sean los de Hostinger (`ns1.dns-parking.com` / `ns2.dns-parking.com`). Si son otros, los registros se editan donde apunten esos nameservers.
2. **Borra** los registros por defecto que chocan (los de "parking" de Hostinger):
   - Cualquier registro **A** con nombre `@` que no sea la IP de tu VPS.
   - Cualquier registro **AAAA** con nombre `@` o `www` (si no configuraste IPv6 en el VPS, un AAAA viejo rompe el sitio para algunos visitantes).
   - Cualquier **CNAME** o **A** de `www` que apunte a otro sitio.
   - No toques registros **MX** o **TXT** (correo, verificaciones).
3. **Crea**:
   | Tipo  | Nombre | Apunta a              | TTL  |
   |-------|--------|-----------------------|------|
   | A     | `@`    | `IP-PUBLICA-DEL-VPS`  | 3600 (o 300 mientras pruebas) |
   | CNAME | `www`  | `kiuna.cloud`         | 3600 |
   (En lugar del CNAME tambien vale un **A** `www` → `IP-PUBLICA-DEL-VPS`.)
4. **Propagacion:** suele tardar entre 5 minutos y 1 hora; en casos raros hasta 24-48 h.
5. **Como comprobarlo** (en PowerShell o CMD):
   ```bash
   nslookup kiuna.cloud
   nslookup www.kiuna.cloud
   ```
   Debe responder con la IP de tu VPS. Tambien puedes usar https://dnschecker.org.

---

## 4. Checklist despues del deploy

- [ ] `https://kiuna.cloud` carga con candado (HTTPS valido).
- [ ] `https://www.kiuna.cloud` redirige (o carga) correctamente.
- [ ] Los botones de **agendar llamada (Cal.com)** abren la agenda.
- [ ] El boton de **WhatsApp** abre el chat con el numero correcto.
- [ ] Enviar **un formulario de prueba real** y confirmar que llega a **kiunalabs@gmail.com** (revisa tambien Spam).
- [ ] En el panel de **Web3Forms** (web3forms.com → tu formulario/clave): si tienes activada alguna restriccion de dominio ("Allowed domains"), agrega `kiuna.cloud` y `www.kiuna.cloud`.
- [ ] Revisar el sitio en el **celular** (menu, formulario, botones, que no haya scroll horizontal).
- [ ] Recarga forzada (Ctrl+F5) tras un cambio: index.html no se cachea, asi que los cambios se ven al instante.

Si el formulario falla con "access key" o similar: la variable no llego al build. Revisa el paso 1.5 y vuelve a desplegar.

---

## 5. Como actualizar el sitio despues

1. Edita los archivos (normalmente `src/App.tsx` o `src/styles.css`).
2. Prueba en local: `npm run dev` → abre `http://127.0.0.1:4173`.
3. Guarda los cambios en Git y subelos:
   ```bash
   git add .
   git commit -m "Describe el cambio"
   git push
   ```
4. EasyPanel detecta el push y vuelve a construir y publicar (si Auto Deploy esta activo; si no, pulsa **Deploy** en EasyPanel).
5. Espera 1-2 minutos y revisa `https://kiuna.cloud`.

**Cambiar la clave de Web3Forms:** actualizala en EasyPanel → Environment y pulsa **Deploy** (no hace falta tocar el codigo).
