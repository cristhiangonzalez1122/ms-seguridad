import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credentials, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require('crypto-js/md5');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {
  constructor(
    @repository(UsuarioRepository)
    public userRepository: UsuarioRepository,
  ) {}

  /**
   * crear una clave aleatoria
   * @returns texto aleatoria de 10 caracteres
   */
  createRandomText(n: number): string {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    return password;
  }

  /**
   * cifrar un texto con metodo md5
   * @param text texto a cifrar
   * @returns texto cifrado con MD
   */
  encriptText(text: string): string {
    const encryptText = MD5(text).toString();
    return encryptText;
  }

  /**
   * se busca un usario por sus credenciales
   * @param credentials credenciales del usuario
   * @returns usuario encontrado o null
   */
  async validateUser(credentials: Credentials): Promise<Usuario | null> {
    const usuario = await this.userRepository.findOne({
      where: {
        email: credentials.email,
        password: credentials.userPassword,
      },
    });
    return usuario as Usuario;
  }
}
