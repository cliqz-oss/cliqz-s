//
//  NotificationModule.m
//  CliqzS
//
//  Created by Tim Palade on 3/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// Doc: Call the registerForEvent method with the name of the native notification you want to receive.
//      Whenever a notification is received, an event is sent to the javascript, containing the name of the notification and info associated with it.

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

@interface NotificationModule : RCTEventEmitter

@end

@implementation NotificationModule

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"NotificationEvent"];
}

RCT_EXPORT_METHOD(registerForEvent:(NSString *)name)
{
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationFired:) name:name object:nil];
}

- (void)notificationFired:(NSNotification*)notification {
  NSDictionary* body = @{@"name": notification.name, @"info": notification.userInfo};
  [self sendEventWithName:@"NotificationEvent" body: body];
}

@end

