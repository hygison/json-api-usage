#!/bin/bash
set -euo pipefail

apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release

if ! command -v docker &>/dev/null; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
$(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

systemctl enable docker
systemctl start docker

mkdir -p /opt/app
cat <<'EOF' >/opt/app/.env
${app_env}
EOF

/usr/bin/docker pull ${container_image}

if /usr/bin/docker ps -a --format '{{.Names}}' | grep -Eq '^json-api$'; then
  /usr/bin/docker rm -f json-api
fi

/usr/bin/docker run -d \
  --name json-api \
  --restart always \
  --env-file /opt/app/.env \
  -p 80:${app_port} \
  ${container_image}
