import { Module } from '@nestjs/common';
import RavenContext from "./database/raven-context";

const connectionFactory = {
    provide: 'contextdb',
    useFactory: () => {
      return RavenContext.getContext();
    }
  };
  
  
  @Module({
    imports: [],
    controllers: [],
    providers: [connectionFactory],
    exports: [connectionFactory]
  })
  export class SharedModule {}